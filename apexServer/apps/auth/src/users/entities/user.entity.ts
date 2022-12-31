import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;

  @Column()
  password: string;
}
