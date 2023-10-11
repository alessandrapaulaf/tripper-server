import { Exclude } from 'class-transformer';
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

  @Exclude({ toPlainOnly: true })
  @Column()
  hash: string;

  @Exclude({ toPlainOnly: true })
  @Column({ default: true, nullable: true })
  isActive: boolean;
}
