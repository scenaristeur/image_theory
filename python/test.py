
#from thoe import Image, MyClass

import thoe

options = {
    "path": "../images/leave3-300x224.jpg",
    "focus": {"x":10,"y":10},
    "nb_points": 6,
    "method": "hazard", # "hazard", 
    "window": {"x":100, "y":100 }, # nb points to analyse at each step
    "step": 10,
    }
img = thoe.Timage(options)
   
# Created a class object 
#gfg = thoe.Timage(img_test) 
   
# Calling and printing class methods 
#print(gfg.add(15,5)) 
#print(gfg.sub(15,5)) 
   
# Calling the function 
#thoe.method()

#gfg.test("../images/leave3-300x224.jpg")


 

