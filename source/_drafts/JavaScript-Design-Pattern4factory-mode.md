
title: javascript设计模式（四）：工厂模式
date: 2017-03-26 22:01:41
tags: [js,js设计模式] 
categories: js
---

我理解的工厂模式就是我们自己先创造一个工厂，里面可以生成好多组件，比如说我的工厂可以生产小轿车也可以生成大卡车，那么当我需要用小轿车的时候就给我的工厂说我需要小轿车，然后它就可以给你生成一个小轿车。
<!--more-->
## 使用工厂模式
下面通过使用构造器模式逻辑来定义一个汽车。
```
// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car( options ) {

  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";

}

// A constructor for defining new trucks
function Truck( options){

  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {

  if( options.vehicleType === "car" ){
    this.vehicleClass = Car;
  }else{
    this.vehicleClass = Truck;
  }

  return new this.vehicleClass( options );

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log( car instanceof Car );

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
```
在这个例子中，我们首先定义了两个函数：Car 和 Trucks，这两个类中有Car和Trucks的属性默认值并且也可以自己传入参数，就是相当于造Car和Trucks的方法

然后我们定义了一个工厂，将创造Car和Trucks 的方法放到工厂里面（通过给VehicleFactory的prototype上增加Car和Trucks方法），默认是要创建一个Car，