import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  task!: string;

  @Column('datetime', { onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
