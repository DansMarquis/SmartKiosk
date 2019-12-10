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
import json
from json import JSONEncoder
from enum import Enum
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

class MyEncoder(JSONEncoder):
   def default(self, o):
      return o.__dict__  

class Root:

   def __init__(self,dest,eventList,publicityList):
      self.dest= dest
      self.eventList= eventList
      self.publicityList= publicityList       

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

   @cherrypy.expose
   def getEventsList(self):
      return json.dumps(self.eventList,cls=MyEncoder)

class EventType(Enum):
   Cultural= 1
   Musical= 2
   Sports= 3
   Family= 4
   Religious= 5

class EventAge(Enum):
   M3= 1
   M6= 2
   M12= 3
   M16= 4
   M18= 5    

class Event:
       
   def __init__(self,image,name,etype,age,date,cord, tickets):
      self.image= image
      self.name= name
      self.etype= etype
      self.age= age
      self.date= date
      self.cord= cord
      self.tickets= tickets

   def sellTicket(self):
      self.ticket-= 1   


e0= Event("../img/teatro.jpg", "Theatre Play", EventType.Cultural.name, EventAge.M12.name, 1576620000, [40.763278, -73.983159], 250)
e1= Event("../img/concerto.jpg", "Outside Concert", EventType.Musical.name, EventAge.M3.name, 1576681200, [40.785091, -73.968285], 100)
e2= Event("../img/futebol.jpg", "Football Game", EventType.Sports.name, EventAge.M3.name, 1576783800, [40.829643, -73.926175], 3500)

cherrypy.quickstart(Root("",[e0,e1,e2],[]), "/", config)