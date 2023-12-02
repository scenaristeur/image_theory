# https://www.geeksforgeeks.org/python-pil-getpixel-method/



# Importing Image from PIL package 
from PIL import Image
 
# creating a image object
im = Image.open(r"../images/leave3-300x224.jpg")
px = im.load()
print (px[4, 4])
px[4, 4] = (255, 0, 0)
print (px[4, 4])
coordinate = x, y = 150, 59
 
# using getpixel method
print (im.getpixel(coordinate));

im.show()
im.save('../output/leave-v2.png')
