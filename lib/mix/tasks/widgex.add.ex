defmodule Mix.Tasks.Widgex.Add do
  @moduledoc """
  Copies the specified components into the current project.
  """
  use Igniter.Mix.Task

  alias Igniter.Mix.Task.Info

  @impl Igniter.Mix.Task
  def info(_argv, _source) do
    %Info{}
  end

  @impl Igniter.Mix.Task
  def igniter(igniter, components) do
    components
    |> Enum.reduce(igniter, fn component, igniter ->
      template =
        Application.app_dir(:widgex, ["priv", "templates"])
        |> Path.join("#{component}.ex.heex")

      component_module =
        Igniter.Libs.Phoenix.web_module_name("Components.#{String.capitalize(component)}")

      path =
        component_module
        |> Igniter.Code.Module.proper_location()

      igniter
      |> Igniter.copy_template(
        template,
        path,
        web_module: inspect(Igniter.Libs.Phoenix.web_module_name())
      )
      |> Igniter.update_elixir_file(
        Igniter.Code.Module.proper_location(Igniter.Libs.Phoenix.web_module_name()),
        fn zipper ->
          {:ok, zipper} = Igniter.Code.Function.move_to_defp(zipper, :components, 0)

          {:ok, zipper} =
            Igniter.Code.Common.move_to_cursor(zipper, """
            quote do
              __cursor__()
            end
            """)

          Igniter.Code.Common.add_code(zipper, """
          import #{inspect(component_module)}
          """)
        end
      )
    end)
  end
end
