import feedStyles from './feed.module.css'
import FeedList from '../../feedList/feedList'
import FeedStats from '../../feedStats/feedStats'
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions'
import { WS_FEED_URL } from '../../../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Feed() {

    useEffect(() => {
        dispatch(wsConnect(WS_FEED_URL));
        return () => dispatch(wsDisconnect());
    }, []);

    const dispatch = useDispatch()
    const { orders, total, totalToday } = useSelector(
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