import request from '@/utils/request'
export function getEventCalendar() {
    return request({
        method: 'GET',
        url: '/getEventCalendar',
    })
}