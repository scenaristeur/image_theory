
# https://www.geeksforgeeks.org/python-pil-getpixel-method/

# todo implement from json https://softwareengineering.stackexchange.com/questions/425788/initializing-instance-variables-from-json-file

# Importing Image from PIL package 
from PIL import Image
import random
import json, os, time

 



class Timage:
    def __init__(self, options = {}):
        self.ts = str(int(time.time()))
        self.output = '../output/'+self.ts+'/'
        self.last_output = '../output/00_last/'
        os.makedirs(self.output)
        if not os.path.exists(self.last_output):
            os.makedirs(self.last_output)
        self.nb_points =128 # todo manage default value
        if  ["nb_points" in options ] :
            print("nb_points", options["nb_points"])
            self.nb_points = options["nb_points"]  
      # = else 128 #(128, options["nb_points"]) ["nb_points" in options ]  #(if_test_is_false, if_test_is_true)[test] https://book.pythontips.com/en/latest/ternary_operators.html
        self.path = options["path"]
        self.img = Image.open(self.path)
        self.px=self.img.load()
        self.size=self.img.size
        self.center = {'x': int(self.size[0]/2), 'y': int(self.size[1]/2)} #tuple(ti/2 for ti in self.size) # should work for 3D too https://stackoverflow.com/questions/36386627/how-can-i-divide-each-element-in-a-tuple-by-a-single-integer
        self.temp_points = []
    


        self.bazics(options)
        print("-- Timage", self)
        self.run(options)

  


        
       # print("temp_points", self.temp_points)
        #print("temp_points", self.printPoints())
        self.transfer()
 



    def transfer(self):
        #from PIL import Image
        new_image_size = (300,224)
        img = Image.new('RGB', new_image_size, color = 'black')
        px = img.load()
        for p in self.temp_points:
            print ("--point",p)
            img_center = {'x': int(img.size[0]/2), 'y': int(img.size[1]/2)} 
            coord = {'x':p['c']['x']+img_center['x'], 'y':p['c']['y']+img_center['y']}
            v = (p['v']['r'],p['v']['g'],p['v']['b'])
            print("coord",coord, "value", v)
            if coord['x'] < new_image_size[0] and coord['y'] < new_image_size[1]:
                px[coord['x'], coord['y']] = v



        img.save(self.output+'black.png')
        img.save(self.last_output+'black.png')

    def run(self, options):
        print("run")
        match options["method"]:
            case "hazard":
                self.hazard()
            #case pattern-3:
            #   action-3
            case _:
                print("unrecognize analyse method, see the doc, please")




    def bazics(self, options ):
        self.temp_points.append(Tpoint(self, self.center))
        if options and options["focus"]:
            print(options["focus"])
            self.focus = options["focus"]
        #else:
        #    self.focus = self.center
        self.temp_points.append(Tpoint(self, self.focus))


  

        

    def hazard(self):
        print("hazard")
        for x in range(0, self.nb_points):
            c = {'x':random.randint(0, self.size[0]-1), 'y':random.randint(0, self.size[1]-1)}
            print("We're on time %d and get %s" % (x, c))
            self.temp_points.append(Tpoint(self, c))


        
    def __str__(self):
        return f"PATH: {self.path} (SIZE: {self.size}, CENTER: {self.center}, FOCUS: {self.focus}, NB_POINTS: {self.nb_points})" 
    
    def printPoints(self):
        # Parsing the JSON data string into Python objects
        #jsonObject = json.loads(self.temp_points)

        # Converting the Python objects back to a JSON string with indentation
        jsonPrettyFormattedStr = json.dumps(
            self.temp_points,
              indent=3
              )

        # Printing the prettified JSON string
        print("Pretty formatted JSON array: " , jsonPrettyFormattedStr)

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
    coord = {'x': coord['x'] -master.center['x'], 'y': coord['y'] - master.center['y']}
    pixel = master.px[coord['x'], coord['y']]
    v = {'r': pixel[0],'g': pixel[1],'b': pixel[2]}
    return {"c": coord, "v": v}