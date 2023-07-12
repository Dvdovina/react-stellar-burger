import feedStatsStyles from './feedStats.module.css'

function FeedStats() {
   return (
      <section className={feedStatsStyles.section}>
         <div className={feedStatsStyles.status}>
            <div className={feedStatsStyles.status_box}>
               <p className="text text_type_main-medium pb-6">Готовы:</p>
               <ul className={feedStatsStyles.orders_list} >
                  <li className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>012345</li>
               </ul>
            </div>
            <div className={feedStatsStyles.status_box}>
               <p className="text text_type_main-medium pb-6">В работе:</p>
               <ul className={feedStatsStyles.orders_list}>
                  <li className={`${feedStatsStyles.number} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number} text text_type_digits-default`}>012345</li>
                  <li className={`${feedStatsStyles.number} text text_type_digits-default`}>012345</li>
               </ul>
            </div>
         </div>
         <div className={feedStatsStyles.statistics}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <span className={`${feedStatsStyles.shadow} text text_type_digits-large`}>25673</span>
         </div>
         <div className={feedStatsStyles.statistics}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`${feedStatsStyles.shadow} text text_type_digits-large`}>423</span>
         </div>
      </section>
   )
}


export default FeedStats



