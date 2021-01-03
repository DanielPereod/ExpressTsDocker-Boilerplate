import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface BookAttributes {
  id?: string;
  isbn: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface BookError {
  message: string;
  httpcode: number;
}
export interface BookResponse {
  book?: BookAttributes | BookAttributes[];
  errors?: BookError;
}

@Entity()
export class Book implements BookAttributes {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  isbn!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
