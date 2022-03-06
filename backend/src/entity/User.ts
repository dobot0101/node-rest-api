import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 20 })
  name!: string;

  @Column('varchar', { length: 40, unique: true })
  email!: string;

  @Column('varchar', { length: 20 })
  password!: string;

  @Column('varchar', { length: 11 })
  phoneNumber!: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;
}
