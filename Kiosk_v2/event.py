import os.path
import json
from json import JSONEncoder
from enum import Enum
        

class MyEncoder(JSONEncoder):
   def default(self, o):
      return o.__dict__  

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
       
   def __init__(self,image,name,etype,age,date,cord, tickets, prices):
      self.image= image
      self.name= name
      self.etype= etype
      self.age= age
      self.date= date
      self.cord= cord
      self.tickets= tickets
      self.prices= prices

   def remainingTickets(self):
      count= 0
      for key in self.tickets:
         seats= self.tickets[key]
         for i in range(0,len(seats)):
            for j in range(0,len(seats[i])):
               if seats[i][j]== 0:
                  count+= 1
      return count                   

   def sellTicket(self,section,line,col):
      if section in self.tickets:
         (self.tickets[section])[line][col]= 1 


t0= {'Floor 1': [[0 for x in range(12)] for y in range(8)], 'Floor 2': [[0 for x in range(8)] for y in range(6)]}
t1= {'Standart Area': [[0 for x in range(20)] for y in range(8)], 'VIP Area': [[0 for x in range(15)] for y in range(4)]}
t2= {'North Stand': [[0 for x in range(18)] for y in range(8)], 'South Area': [[0 for x in range(18)] for y in range(8)], 'East Stand': [[0 for x in range(16)] for y in range(6)], 'West Stand': [[0 for x in range(16)] for y in range(6)]}
e0= Event("../img/teatro.jpg", "Theatre Play", EventType.Cultural.name, EventAge.M12.name, 1576620000, [40.763278, -73.983159], t0, [25,30])
e1= Event("../img/concerto.jpg", "Outside Concert", EventType.Musical.name, EventAge.M3.name, 1576681200, [40.785091, -73.968285], t1, [10,40])
e2= Event("../img/futebol.jpg", "Football Game", EventType.Sports.name, EventAge.M3.name, 1576783800, [40.829643, -73.926175], t2, [20,20,20,20])
events= json.dumps([e0,e1,e2],cls=MyEncoder)
with open('json/events.json', 'w') as json_file:
    json.dump(events, json_file)
