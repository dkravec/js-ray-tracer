# Ray Tracer

Created by Daniel Kravec, on July 9th, 2022


## Version history
### v1.0 (1.2022.07.09)
- 2 render options, small and colourful gradient, or larger black and white gradient.
- Express application, with web and backend options.

### v1.0 (2.2022.07.10)
- You can now save the images, press button, opens new tab, and save as image.
- Added v3-v6 renders, different designs.
- created /example_renders so you can check out the different designs/renders.

### v1.0 (3.2022.07.10)
- Moved each render into a new file.
- One file compiles all possible files within /imageRenders, and sends them to api, which can choose the function to take.
- Created v7+v8 renders.

Problems, render can run out of memory to render. (maybe use c# instead for calucations)

### v1.0 (4.2022.07.11)
- Created v9, renders objects. Options for solid (default), outline, and thickness.
- Added examples for v7-9.

### v1.0 (5.2022.07.12)
- Created v10, a copy of v9, but with a light source.
- Light source in v10 changes colours.
- Problem: Light source size is not correct.

### v1.0 (6.2022.07.13)
- Fixed proper light source size for v10.
- v11 is a copy of v6 but with large light sources.

### v1.0 (7.2022.07.16)
- v12 is a copy of v5 but with large light sources.

### v1.0 (8.2022.07.17)
- v13 is similar to v12, but now has a new light source checker.

### v1.0 (9.2022.09.22)
- Created v14
    - Renders a circle (the circumference of the circle)
- Added route /options, sends you every possible render option.
- getRenders.js now sorts options before sending.
- Frontend updates:
    - Removed "hello" on load.
    - added a form dropdown to select all the versions you want.
    - Cleaned up code a little.

### v1.0 (10.2022.09.23)
- Cleaned V9
- Created v15
    - can render mutiple circles
    - includes the cubes from v9

### v1.0 (11.2022.09.24)
- Created v16, evolved from v15
    - now lets you add lights to the scene. (from v10)
    - all objects are now in a single array, and program loops over and knows which type of object it is.
- Added examples for v15, and v16

-- ideas
- have a websocket where it can render every 10 seconds?
- put the ws inside the function

### v1.0 (12.2022.10.12)
- Created v17, copy of v16.
- Created a system for saving pixels in processing, cut render time from 5000ms -> 100ms.
- Now tells you which function is running in console, ex: "loading" -> "loading: v16".
- Changed Options header to h3, from h1.
- Renders are now a post, instead of a get - lets body be sent with requests.
- Started an options panel (in notes/design).
    - created a options varible, where all options will be stored.
    - eventually will be able to have a dropdown with different objects.

### v1.0 (13.2022.10.13)
- Commented console logs in v14, a lot quicker.
- v17 changed way final renders. It now doesnt need to convert imageNew into image.
- Created v18, copy of v17
    - with attempts to make a background (not done).
    - Started creating an options modifier, with all the possible otpions
        - will place into json file, with standardized numbers.
- api sends options to frontend.
- BUGS:
    - Outline isnt properly doing outside line + is not being caught by light and background.
### v1.0 (14.2022.10.15)
- Added v17 and v18 render examples.
- v18.
    - uncommentted lights.
    - fixed renderCube, now isnt missing a pixel.
    - cube outline now renders right side properly, was pushing to wrong array.
    - removed extra comments+cleaned code.

### v1.0 (15.2022.10.26)
- added /modules/modules.json and /modules/fetchModules.js
    - modules.json has information about object types in renders. (none functional in renders) 

### v1.0 (16.2022.11.28)
- added a dockerfile for hosting with cloudflare.

### v1.0 (17.2022.11.28)
- added readme info for dockerfile.
- removed copy of config.json

### v1.0 (18.2022.11.28)
- updated dockerfile

### v1.0 (19.2022.01.08)
- updated dockerfile, EXPOSE 3005 3000

### v1.0 (20.2022.01.08)
- updated dockerfile, EXPOSE 3000 3005

### v1.0 (21.2022.01.08)
- updated dockerfile, EXPOSE 3005 3000 again

### Good Resources To Use
https://tmcw.github.io/literate-raytracer/

https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle/



This is Js Ray Tracer created by Daniel Kravec

```
docker build -t novapro/js_ray_tracer . && docker tag novapro/js_ray_tracer registry.xnet.com:5000/novapro/js_ray_tracer:latest && docker push registry.xnet.com:5000/novapro/js_ray_tracer
```

To build Docker Image:
```
$ docker build -t novapro/js_ray_tracer .
```
To Run/Test localy:
```
$ docker run --name js_ray_tracer -d novapro/js_ray_tracer:latest
```
To Stop test (get container_id from docker 
```
$ docker stop <container_id>
```
To Login Into Registry (SHould only have to do once ever):
```
$ docker login registry.xnet.com:5000
```
To push image to registry:
```
$ docker tag novapro/js_ray_tracer registry.xnet.com:5000/novapro/js_ray_tracer:latest
$ docker push registry.xnet.com:5000/novapro/js_ray_tracer
```
Registry Format:
// Eg: registry.xnet.com:5000/daniel/novapro/homepage_test:latest

Docker Tag Standard:
 is the latest master master build (used for production)
 is the latest non master branch build