getUser(userId, (err, user) => {
    if (err) return handleError(err);
    getOrders(user.id, (err, orders) => {
        if (err) return handleError(err);
        processOrders(orders, (err) => {
            if (err) return handleError(err);
            console.log('All done!');
        });
    });
});