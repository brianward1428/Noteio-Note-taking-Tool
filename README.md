


# Noteio Note Taking Tool

### Introduction
This is an individual project which was a semester long project in my web development course at NEU. I chose to build a note-taking site which would allow users to use wikipedia pages as templates for their notebooks. 

**Language Used:** JavaScript, **Tools Used:** ReactJS, Redux,  NodeJs, Express, MongoDB


Currently the site is hosted on a free-tier Heroku server :   
https://vast-journey-11718.herokuapp.com/home  
Please feel free to mess around with creating a notebook from a wikipedia template. 

**Note:** you must be logged in to create a notebook. You can easily create a dummy account by registering. A user can only edit/create a notebook if they are the author of that notebook (or an Admin). 

###  Design
Unfortunately the various specific requirements of the assignments pointed me away from the original plan of creating a collaborative note-taking app. This web app is built in ReactJS with the use of Redux for state management. NodeJs and ExpressJs were used to build a RESTful API to interact with the database. MongoDB was used for data storage, with Mongoose in the ExpressJs API used to interact with the DB.

**Implemented Features :** 
* User registration
* User authentication
* Search Wikipedia (API) and view a preview of the page translated to a notebook in Noteio
* Create a new Noteio notebook from a wikipedia page (or blank)
* View user profiles (limited data for non-admin)
* Edit notebooks (if author) via a rich text editor.
* Admins have the ability to edit/delete all users/notebooks

**Next Steps:**
My original plan was to allow for users to comment on different parts or blocks of the notebooks, whick would allow users to work on notebooks together. I would also like to change the home page from its lists of current notebooks and users to a more user-centered home page which would list their notebooks, users they follow etc. I would really love re-design the notebook editor page using SlateJS (currently using ReactQuill).

