
# https://www.geeksforgeeks.org/python-pil-getpixel-method/



# Importing Image from PIL package 
from PIL import Image





class Timage:
    def __init__(self, path):
        self.path = path
        self.img = Image.open(path)
        self.size=self.img.size
        self.center = tuple(ti/2 for ti in self.size) # should work for 3D too https://stackoverflow.com/questions/36386627/how-can-i-divide-each-element-in-a-tuple-by-a-single-integer
        print("self", self)
        
    def __str__(self):
        return f"PATH: {self.path}(SIZE: {self.size}, CENTER: {self.center})" 

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