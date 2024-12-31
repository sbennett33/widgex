import Config

if Mix.env() == :dev do
  esbuild = fn args ->
    [
      args: ~w(./js/widgex --bundle) ++ args,
      cd: Path.expand("../assets", __DIR__),
      env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
    ]
  end

  config :esbuild,
    version: "0.20.2",
    module: esbuild.(~w(--format=esm --sourcemap --outfile=../priv/static/widgex.esm.js)),
    main: esbuild.(~w(--format=cjs --sourcemap --outfile=../priv/static/widgex.cjs.js))
end
