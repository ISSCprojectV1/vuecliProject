import request from "@/utils/request";

export function exceptionRelationAnalysis(start, end, threshold_f, threshold_fp) {
    return request({
        method: 'POST',
        data: {
            "start": start,
            "end": end,
            "threshold_f": threshold_f,
            "threshold_fp": threshold_fp
        },
        url: '/ExceptionRelationAnalysis'
    })
}

export function exceptionRelationPredict(sourceId, threshold) {
    return request({
        method: 'POST',
        data: {
            "source_id": sourceId,
            "threshold_p": threshold
        },
        url: 'ExceptionRelationPredict'
    })
}

export function reportException(exceptionData) {
    return request({
        method: 'POST',
        data: {
            "source_id":exceptionData.source_id,
            "generate_time":exceptionData.generate_time,
            "product_id":exceptionData.product_id,
            "type_id":exceptionData.type_id
        },
        url: 'reportException'
    })
}
