const tg = window.Telegram.WebApp;


export function useTelegram() {


    const onClose = () => {
        tg.onEvent('backButtonClicked', function () {
            history.back();
            tg.MainButton.hide();
        });
    }

    return {
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe.query_id
    }
}