import {
  Subject, Answer, Comment, Question,
} from '../types/subject';

function validateAnswer(element: any): element is Answer {
  if (!element) {
    return false;
  }

  if (typeof element.answer !== 'string') {
    return false;
  }

  if (typeof element.correct !== 'boolean') {
    return false;
  }

  return true;
}

function validateComment(element: any): element is Comment {
  if (!element) {
    return false;
  }

  if (typeof element.author !== 'string') {
    return false;
  }

  if (typeof element.comment !== 'string') {
    return false;
  }

  if (typeof element.date !== 'string') {
    return false;
  }

  return true;
}

function validateQuestion(element: any): element is Question {
  if (!element) {
    return false;
  }

  if (typeof element.question !== 'string') {
    return false;
  }

  if (typeof element.id !== 'number') {
    return false;
  }

  if (!element.comments && element.comments !== null) {
    return false;
  }

  if (element.comments !== null && !Array.isArray(element.comments)) {
    return false;
  }

  if (
    element.comments !== null
      && !(element.comments as Array<any>).every(validateComment)
  ) {
    return false;
  }

  if (!Array.isArray(element.answers)) {
    return false;
  }

  if (!(element.answers as Array<any>).every(validateAnswer)) {
    return false;
  }

  return true;
}

export function validateSubject(element: any): element is Subject {
  if (!element) {
    return false;
  }

  if (typeof element.title !== 'string') {
    return false;
  }

  if (typeof element.id !== 'string') {
    return false;
  }

  if (!Array.isArray(element.data)) {
    return false;
  }

  if (!(element.data as Array<any>).every(validateQuestion)) {
    return false;
  }

  if (typeof element.updatedAt !== 'number') {
    return false;
  }

  return true;
}
