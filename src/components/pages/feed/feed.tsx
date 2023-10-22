import feedStyles from './feed.module.css'
import FeedList from '../../feedList/feedList'
import FeedStats from '../../feedStats/feedStats'
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions'
import { WS_FEED_URL } from '../../../utils/api'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useForm'


function Feed() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(wsConnect(WS_FEED_URL));
        return () => { dispatch(wsDisconnect()) };
    }, []);

    const { orders, total, totalToday } = useAppSelector(
        (store) => store.feed,
    );

    return (
        <section className={feedStyles.section}>
            <FeedList orders={orders} />
            <FeedStats orders={orders} total={total} totalToday={totalToday} />
        </section>
    )
}


export default Feed