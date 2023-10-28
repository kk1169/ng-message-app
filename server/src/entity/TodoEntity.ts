import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { TodoStatus } from "../models";
import { ProjectEntity } from "./ProjectEntity";

@Entity("todos")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => ProjectEntity)
  projectId: ProjectEntity;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity)
  assignedTo: UserEntity;

  @Column({ type: "enum", enum: TodoStatus, default: TodoStatus.BACKLOG })
  status: TodoStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
