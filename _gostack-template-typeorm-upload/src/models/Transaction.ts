import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';

@Entity({ name: 'transactions' })
class Transaction {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column({ type: 'decimal' })
  value: number;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Transaction;
