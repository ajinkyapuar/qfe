import { jobService } from '../_services/job.service';
import { resolve } from 'url';

const state = { status: {}, job };

const actions = {
    save_name({ commit }, job) {
        console.log("job", job)
        commit('submitting', job)
        // console.log("action", project)
        return new Promise((resolve, reject) => {
            jobService.save_name(job).then(jobId => {

                // console.log("project created", pro)
                return resolve(jobId)

            }, error => {
                return reject(error)
            })
        })

    },

    uploadImage({ commit }, data) {
        console.log("modup", data)
        return new Promise((resolve, reject) => {
            jobService.upload(data).then(containerId => {
                console.log(containerId)
                resolve(containerId)
            }, error => {
                console.log(error)
                reject(error)
            })
        })

    },


}

const mutations = {
    submitting(state, job) {
        console.log("working")
        state.status = { submitting: true }
        state.job = job
    }
}

export const job = {
    namespaced: true,
    state,
    mutations,
    actions
}