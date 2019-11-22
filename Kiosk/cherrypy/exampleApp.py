#!python
# Example of a cherrypy application that serves static content,
# as well as dynamic content.
#
# JMR@ua.pt 2016
#
# To run:
#	python exampleApp.py

import os.path
import cherrypy

# The absolute path to this file's base directory:
baseDir = os.path.dirname(os.path.abspath(__file__))

# Dict with the this app's configuration:
config = {
   "/":     { "tools.staticdir.root": baseDir },
   "/js":   { "tools.staticdir.on": True,
            "tools.staticdir.dir": "js" },
   "/css":  { "tools.staticdir.on": True,
            "tools.staticdir.dir": "css" },
   "/html": { "tools.staticdir.on": True,
            "tools.staticdir.dir": "html" },
   "/img":  { "tools.staticdir.on": True,
			   "tools.staticdir.dir": "img"  }          
}

class Root:

   dest= ""

   @cherrypy.expose
   def index(self):
      path= "html/index.html"
      return (open(path,"rb").read())

   
   @cherrypy.expose
   def events(self):
      cherrypy.response.headers["Content-Type"] = "text/html"
      path= "html/events.html"
      return (open(path,"rb").read())

   @cherrypy.expose
   def map(self):
      cherrypy.response.headers["Content-Type"] = "text/html"
      path= "html/map.html"
      return (open(path,"rb").read()) 

   @cherrypy.expose
   def weather(self):
      cherrypy.response.headers["Content-Type"] = "text/html"
      path= "html/weather.html"
      return (open(path,"rb").read())

   @cherrypy.expose
   def setDirections(self, dest):
      self.dest= dest

   @cherrypy.expose
   def getDirections(self):
      return self.dest

cherrypy.quickstart(Root(), "/", config)