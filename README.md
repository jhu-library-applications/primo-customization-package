# Primo customization packages

This repo contains the files that are used for generating a Primo customization package for a view. 

If you check the [GitHub Actions runs](https://github.com/jhu-library-applications/primo-customization-package/actions) and 
go to a successful run, you'll find `zip` files that can be uploaded in Alama. 

The names of the folders in this repo corrospond with the view name in Primo. 

## Building the custom.js file

Primo allows us to have one JS file named `custom.js` that we can add additional JS to. The `custom.js` file in this repo is built from the files in the `src` folder.

To build the `custom.js` file, run `node build.js`. GitHub Actions will build the `custom.js` file and add it to the resulting `zip` file when you push to the repo.
