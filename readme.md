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


-- ideas
- have a websocket where it can render every 10 seconds?
- put the ws inside the function


### Good Resources To Use
https://tmcw.github.io/literate-raytracer/

https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle/
