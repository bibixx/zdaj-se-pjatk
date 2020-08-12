// const adapter = new FileSync<Database>('public/data/skj.json');
// const db = low(adapter);

// const newComment: Comment = { author, comment: contents, date: new Date(Date.now()).toString() };
// const questionIndex = db
//   .get('data')
//   .findIndex((question) => question.id === id)
//   .value();
// if (questionIndex === -1) {
//   res.json({
//     ok: false,
//     error: 'No such question in this subject',
//   });
//   return;
// }
// db
//   .get(['data', questionIndex, 'comments'])
//   .push(newComment)
//   .write();
