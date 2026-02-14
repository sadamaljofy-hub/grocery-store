
import { Category, Product } from './types';

export const WHATSAPP_NUMBER = '967772445842';
export const ADMIN_USERNAME_KEY = 'admin_username';
export const ADMIN_PASSWORD_KEY = 'admin_password';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'snack-1',
    name: 'بفك طرزان الأصلي (كبير)',
    price: 200,
    image: 'https://images.unsplash.com/photo-1621444541669-0f99474937c0?auto=format&fit=crop&q=80&w=400',
    category: Category.SNACKS
  },
  {
    id: 'snack-2',
    name: 'بفك ميكي حار نار',
    price: 150,
    image: 'https://images.unsplash.com/photo-1600454021970-351eff4a6554?auto=format&fit=crop&q=80&w=400',
    category: Category.SNACKS
  },
  {
    id: 'canned-1',
    name: 'إندومي شعيرية دجاج (كرتون)',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400',
    category: Category.CANNED_DRINKS
  },
  {
    id: 'drink-1',
    name: 'عصير راني حبيبات مانجو',
    price: 500,
    image: 'https://images.unsplash.com/photo-1622597467827-430939add69b?auto=format&fit=crop&q=80&w=400',
    category: Category.CANNED_DRINKS
  },
  {
    id: 'veg-1',
    name: 'طماطم بلدي طازجة',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    category: Category.VEGETABLES,
    freshness: 'قطف اليوم'
  },
  {
    id: 'grocery-1',
    name: 'أرز سيلا بسمتي (5 كجم)',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    category: Category.GROCERY
  },
  {
    id: 'canned-2',
    name: 'تونا تاي لاندي علبة',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1623227413801-14f339696771?auto=format&fit=crop&q=80&w=400',
    category: Category.CANNED_DRINKS
  }
];
