
# https://www.geeksforgeeks.org/python-pil-getpixel-method/

# todo implement from json https://softwareengineering.stackexchange.com/questions/425788/initializing-instance-variables-from-json-file

# Importing Image from PIL package 
from PIL import Image
import random


class Timage:
    def __init__(self, options = {}):
        self.nb_points =128 # todo manage default value
        if  ["nb_points" in options ] :
            print("nb_points", options["nb_points"])
            self.nb_points = options["nb_points"]  
      # = else 128 #(128, options["nb_points"]) ["nb_points" in options ]  #(if_test_is_false, if_test_is_true)[test] https://book.pythontips.com/en/latest/ternary_operators.html
        self.path = options["path"]
        self.img = Image.open(self.path)
        self.px=self.img.load()
        self.size=self.img.size
        self.center = tuple(ti/2 for ti in self.size) # should work for 3D too https://stackoverflow.com/questions/36386627/how-can-i-divide-each-element-in-a-tuple-by-a-single-integer
        self.temp_points = []
    
   

        self.bazics(options)
        self.run(options)



        print("-- Timage", self)
        print("temp_points", self.temp_points)
 

    def run(self, options):
        print("run")




    def bazics(self, options ):
        self.temp_points.append(Tpoint(self, self.center))
        if options and options["focus"]:
            print(options["focus"])
            self.focus = options["focus"]
        #else:
        #    self.focus = self.center
        self.temp_points.append(Tpoint(self, self.focus))

        match options["method"]:
            case "hazard":
                self.hazard()
            #case pattern-3:
            #   action-3
            case _:
                print("unrecognize analyse method, see the doc, please")
  

        

    def hazard(self):
        print("hazard")
        for x in range(0, self.nb_points):
            c = (random.randint(0, self.size[0]), random.randint(0, self.size[1]))
            print("We're on time %d and get %s" % (x, c))
            self.temp_points.append(Tpoint(self, c))


        
    def __str__(self):
        return f"PATH: {self.path} (SIZE: {self.size}, CENTER: {self.center}, FOCUS: {self.focus}, NB_POINTS: {self.nb_points})" 

    def test(self, path):
        # creating a image object
        im = Image.open(path)
        im_size = im.size
        im_center = tuple(ti/2 for ti in im_size) # should work for 3D too https://stackoverflow.com/questions/36386627/how-can-i-divide-each-element-in-a-tuple-by-a-single-integer
        print("size",im.size)
        print("center",im_center)

        return "ok"
        # methods 
    def add(self, a, b): 
        return a + b 
    def sub(self, a, b): 
        return a - b 
    
def method():
    print("hello")

def Tpoint(master,coord):
        if 'x' in coord and 'y' in coord: 
            print(coord['x'])
            coord = (coord['x'], coord['y'])
        coord = tuple(map(lambda i, j: i - j, coord, master.center))

        return {"c": coord, "v": master.px[coord]}