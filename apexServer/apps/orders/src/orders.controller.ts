import { Body, Controller, Get, Param, Post, Req, Res, Response, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {  
    
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }
  
  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
