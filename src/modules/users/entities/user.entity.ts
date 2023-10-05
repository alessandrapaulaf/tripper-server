import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}