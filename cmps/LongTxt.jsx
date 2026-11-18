const { useState } = React

export function LongTxt({ txt = '', length = 100 }) {

    const [isExpanded, setIsExpanded] = useState(false)

    function getText() {
        if (txt.length <= length || isExpanded) {
            return <span>{ txt + ' '}</span>
        }

        if (!isExpanded) {
            const part = txt.substring(0, length) + '... '
            return <span>{ part }</span>
        }
    }

    function getButton() {
        if (txt.length <= length) {
            return ''
        }

        if (isExpanded) {
            return <button onClick={() => setIsExpanded(false)}>read less</button>
        }

        if (!isExpanded) {
            return <button onClick={() => setIsExpanded(true)}>read more</button>
        }
    }

    return (
        <React.Fragment>
            { getText() }
            { getButton() }
        </React.Fragment>
    )
}

            // <span>{getText()}</span>

            // {/* {(txt.length > length) && (
            //     <button onClick={() => setIsExpanded(isExpanded => !isExpanded)}>{isExpanded ? 'read less' : 'read more'}</button>
            // )} */}