import feedStyles from './feed.module.css'
import FeedList from '../../feedList/feedList'
import FeedStats from '../../feedStats/feedStats'



function Feed() {

    return (
        <section className={feedStyles.section}>
            <FeedList />
            <FeedStats />
        </section>
    )
}


export default Feed