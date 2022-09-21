# Bakulina Tatiana Art Shop
A portfolio and shop website for the painter Bakulina Tatiana.  
https://bakulina-tatiana-art.herokuapp.com

## ERD Shop Schema
In the root folder you can see *shop_schema.png*, which is an ERD shop database schema.  
It shows following **TypeORM** entities:

**ShopItem** — item in the shop with it's basic name, price, size attributes    
**Material** — what ShopItem is made of, can be used in many ShopItems and ShopItem can be made from many Materials    
**FrameOption** — a variant of how ShopItem can be framed, stores description text and adds it's price to ShopItem's price when selected    
**FrameOption** — what FrameOption includes, similar to Materials for ShopItems
