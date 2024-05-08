{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devshell = {
      url = "github:deemp/devshell";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-utils.inputs.systems.follows = "systems";
      };
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    poetry2nix = {
      url = "github:nix-community/poetry2nix";
      inputs = {
        flake-utils.follows = "devshell/flake-utils";
        nixpkgs.follows = "nixpkgs";
        systems.follows = "systems";
        treefmt-nix.follows = "treefmt-nix";
      };
    };
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      imports = [ inputs.devshell.flakeModule ];
      perSystem =
        {
          self',
          system,
          lib,
          config,
          pkgs,
          ...
        }:
        let
          poetry2nix = inputs.poetry2nix.lib.mkPoetry2Nix { inherit pkgs; };
          app = poetry2nix.mkPoetryApplication {
            projectDir = ./.;
            groups = [ ];
            checkGroups = [ ];
          };

          packages = {
            bot = pkgs.writeShellApplication {
              runtimeInputs = [ pkgs.python3Packages.python-dotenv ];
              name = "default";
              text = ''dotenv -f "$1" run ${app}/bin/bot'';
              meta.description = "Run the bot";
            };

          };

          devshells.default = {
            commands = {
              tools = [ pkgs.poetry ];
              scripts = [
                {
                  packages = {
                    inherit (config.packages) bot;
                  };
                  prefix = "nix run .#";
                }
              ];
            };
          };
        in
        {
          inherit packages devshells;
        };
    };
}
