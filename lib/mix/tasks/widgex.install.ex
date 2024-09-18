defmodule Mix.Tasks.Widgex.Install do
  @moduledoc """
  Installs dependencies and configures project for using Widgex components.
  """
  use Igniter.Mix.Task

  alias Igniter.Mix.Task.Info

  @impl Igniter.Mix.Task
  def info(_argv, _parent) do
    %Info{}
  end

  @impl Igniter.Mix.Task
  def igniter(igniter, _argv) do
    template_dir = Application.app_dir(:widgex, ["priv", "templates"])

    igniter
    |> Igniter.Project.Deps.add_dep({:cva, "~> 0.2.1"})
    |> Igniter.Project.Formatter.import_dep(:cva)
    |> Igniter.Project.Deps.add_dep({:tails, "~> 0.1.11"})
    |> Igniter.Project.Config.configure(
      "config.exs",
      :tails,
      [:colors_file],
      {:code,
       Sourceror.parse_string!("""
       Path.join(File.cwd!(), "assets/tailwind.colors.json")
       """)}
    )
    |> create_colors_file(template_dir)
    |> update_app_css(template_dir)
    |> update_web_module()
    |> Igniter.add_notice("""
    Update your tailwind config to use the colors file:

    module.exports = {
      ...
      theme: {
        extend: {
          colors: require("./tailwind.colors.json"),
        },
        ...
      },
    }
    """)
  end

  defp create_colors_file(igniter, template_dir) do
    colors_template = Path.join(template_dir, "tailwind.colors.json")

    content =
      colors_template
      |> File.read!()

    Igniter.create_or_update_file(
      igniter,
      "assets/tailwind.colors.json",
      content,
      fn source ->
        original_content = Rewrite.Source.get(source, :content)
        Rewrite.Source.update(source, :content, original_content <> content)
      end
    )
  end

  defp update_app_css(igniter, template_dir) do
    css_template = Path.join(template_dir, "app.css")

    content =
      css_template
      |> File.read!()

    Igniter.create_or_update_file(
      igniter,
      "assets/css/app.css",
      """
      @import "tailwindcss/base";
      @import "tailwindcss/components";
      @import "tailwindcss/utilities";

      /* This file is for your main application CSS */

      #{content}
      """,
      fn source ->
        original_content = Rewrite.Source.get(source, :content)

        Rewrite.Source.update(source, :content, """
        #{original_content}
        #{content}
        """)
      end
    )
  end

  defp update_web_module(igniter) do
    web_module = Igniter.Libs.Phoenix.web_module(igniter)

    Igniter.Project.Module.find_and_update_module!(
      igniter,
      web_module,
      fn zipper ->
        case Igniter.Code.Function.move_to_def(zipper, :component, 0) do
          {:ok, _zipper} ->
            {:warning,
             """
             Found an already existing component/0 function in #{inspect(web_module)}.

             You will need to manually update your component/0 function to include:

             quote do
               use Phoenix.Component
               use CVA.Component

               import #{inspect(web_module)}.Gettext
               import Tails, only: [classes: 1]

               alias Phoenix.LiveView.JS
             end
             """}

          _ ->
            {:ok, zipper} = Igniter.Code.Common.move_to_do_block(zipper)

            zipper =
              Igniter.Code.Common.add_code(zipper, """
              def component do
                quote do
                  use Phoenix.Component
                  use CVA.Component

                  import #{inspect(web_module)}.Gettext
                  import Tails, only: [classes: 1]

                  alias Phoenix.LiveView.JS
                end
              end

              defp components() do
                quote do
                end
              end
              """)

            {:ok, zipper} = Igniter.Code.Function.move_to_defp(zipper, :html_helpers, 0)

            {:ok, zipper} =
              Igniter.Code.Common.move_to_cursor(zipper, """
              quote do
                __cursor__()
              end
              """)

            Igniter.Code.Common.add_code(zipper, """

            unquote(components())
            """)
        end
      end
    )
  end
end
