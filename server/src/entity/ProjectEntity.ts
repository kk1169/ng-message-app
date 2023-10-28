import { Role, Status } from "../models";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("projects")
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  description: string;

  @Column({ select: false })
  tag: string;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
