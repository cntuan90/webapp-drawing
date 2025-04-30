import { db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

export interface Drawing {
  id: string;
  strokes: Array<{
    points: Array<{ x: number; y: number }>;
    color: string;
    width: number;
  }>;
}

export const createDrawing = async (drawingId: string): Promise<void> => {
  const drawingRef = doc(db, 'drawings', drawingId);
  await setDoc(drawingRef, {
    id: drawingId,
    strokes: []
  });
};

export const subscribeToDrawing = (
  drawingId: string,
  onUpdate: (drawing: Drawing) => void
) => {
  const drawingRef = doc(db, 'drawings', drawingId);
  return onSnapshot(drawingRef, (doc) => {
    if (doc.exists()) {
      onUpdate(doc.data() as Drawing);
    }
  });
};

export const addStroke = async (
  drawingId: string,
  stroke: {
    points: Array<{ x: number; y: number }>;
    color: string;
    width: number;
  }
) => {
  const drawingRef = doc(db, 'drawings', drawingId);
  await updateDoc(drawingRef, {
    strokes: arrayUnion(stroke)
  });
};

export const clearDrawing = async (drawingId: string) => {
  const drawingRef = doc(db, 'drawings', drawingId);
  await updateDoc(drawingRef, {
    strokes: []
  });
}; 