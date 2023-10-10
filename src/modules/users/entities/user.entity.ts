import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}
