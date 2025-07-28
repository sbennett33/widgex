defmodule Widgex.MixProject do
  use Mix.Project

  def project do
    [
      app: :widgex,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      aliases: aliases()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:igniter, "~> 0.6"},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false},
      {:dialyxir, "~> 1.4", only: [:dev, :test], runtime: false},
      {:esbuild, "~> 0.10", only: :dev},
      {:phoenix_live_view, "~> 1.0"}
    ]
  end

  defp aliases do
    [
      "assets.build": ["esbuild module", "esbuild main"],
      "assets.watch": ["esbuild module --watch"]
    ]
  end
end
