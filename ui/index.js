var Rx = require('rxjs');

var stream$ = Rx.Observable.create(observer => {
    observer.next('One');

    setTimeout(() => {
        observer.next('After 2 seconds!');
    }, 2000);

    setTimeout(() => {
        observer.complete();
    }, 3000);

    setTimeout(() => {
        observer.next('After 5 seconds!');
    }, 5000);

    observer.next('Two');
});

stream$
    .subscribe(
        data => {
            console.log('Subscribe', data);
        },
        error => {
            console.log('Error', error);
        },
        () => {
            console.log('Completed!');
        }
    );
