import { Injectable } from '@nestjs/common';
import { db } from '../firebase';
import { collection, addDoc, getDocs, limit, query, orderBy } from 'firebase/firestore';

@Injectable()
export class BooksService {
  async addBook(data: any) {
    const booksRef = collection(db, 'books');
    const docRef = await addDoc(booksRef, data);
    return { id: docRef.id, ...data };
  }

  async getFirstBook() {
    const booksRef = collection(db, 'books');
    const q = query(booksRef, limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as any;
  }
} 