const axios = require('axios')
const FortnoxAPI = require('../fortnox')
const fortnox = new FortnoxAPI("mockClientId", "mockClientSecret")

jest.mock("axios")

test('secret should match input secret', () => {
    expect(fortnox.getCredentials()).toBe("bW9ja0NsaWVudElkOm1vY2tDbGllbnRTZWNyZXQ")
})

describe("refreshToken", () => {
    describe("when API call is successful", () => {
        it("should return token data", async () => {

            const mockResult = {
                status: 200,
                statusText: 'OK',
                data: {
                    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInRlbmFudElkIjoxMjk0NDA1LCJjbGllbnRJZCI6IlQ3eDhzQ3p5UDFuQyIsInJpZ2h0c0FzSnNvbiI6Ikg0c0lBQUFBQUFBQUE0MVg2VzRqTnd4K2xcL3h1QnVnanVBNVNCR2gzZzNVV2k2SW9ESTFFanhWZEF4MU9cL1BhbGpobExNN1ozZnhnd0Q1RWZLWXJrXC9QdGdZVFRXdTA2YXZqOFwvXC9EYlRcL2FFaVNHRGNWN1EwdXFKRW82b2xVajNyUGl6MzhOMkJcL2NhSG8zZVJlZWdPWEJOTk9aSFwvQUxFNzhKN3JvWWhPSnRBajJFeFFDOFNENFwvcGtPQVZDcVExRTFpSWlQZGhKbmdXTWNIbjJSRnhNSmdqUFhNS2IyWjJkQlwvVnNKTU5qeFJBaUFkbmFLQ0Fjb3FOSG9relF2aGdIMlFCVWhnVUpHMHJCRlhNajJJT3hxc0dhQUxSaEhpSWNTN1E3d0NJQkthVEdTVytNYVBIbDRJdFM0K29Da0NzeUZIVkhUdEFhYUZFMklubHdEWjZXcXRMZVlMUndBdXRsWDg0MEZ0Rkx6S0FGYXZEU0pTZWVwOEpKeGpWcmxlZkxEdDZvU3JOT3drak8xOEpZSmExaFNFTUY2blBEQ3QzZlFZZHBCQTlUYUJUNDZLOTVyS0FiMHlUSEhBN0pjV1JYR2J4b0djdG1oVnlDTlljd1Zsdnd2UjlxZWlXcmppTDBXbHhqcXJRV2hYdlJiQ05hVnU2RXJiSmtNVlhFTmZGTVwvOVg1c1dTM2MwZnpzUmtzZ0FMdDNVYXpON0RLdFRyb243V2NQaUF2YkkzV1FPTzF1TFhSbDR6M2xaeWo1WjBuUGx3eFc3U2lCSnRXUjQyVWFER29RanM4eHAzbll1XC9rV0hnMjZEMVdEeFdGRmtSaXNSTExnOW9QZ2JQWkdDcE9cLzJCQUsyRDNXQ1hPNlBRbUoxTVJheUdYU1kyOEdcLzJnc2VvUWppSXJ5R0tHWElVeFFUb2liU3dYRlpMOGVpYktrOCtLaXE4R1hVXC8yRmtCaVJsS1JMT1Q3MkdDV3FkMXpQXC81K0pYZFZJbWE4MTlRdUp2RUhnbUIzSWNPZzBkKzNOR091bnBITVZHQ0p4K0hoMXdsejcrRUtjMXhibkc4Z0RiVjkxSGFMeEs3dXV0d1drcWh1ZlJnZmM3VjBpcHlmVEM1RURHTG5JVHFjSitHamo3ZFBjcG1uN2lVQXhtMUFMd3JzV3lYOCthbGRHRWZKZlwvVVV2cHVZanA1bzBVWGVDU1wvNFJYc1k3TlIrcVZFcWhVYlkxcWlSNkhOVm9rV1lpdnJyaDc0aCtRdGZuM2F3WkdcLzVpZE12UWZVcFlVWENWYm5maGVtdEJZWnZIQU9vekNqVDQ5TlpLTytVMndSXC9qTXAwRVVRc3Z5ZnVTQytCYlJoYjQxTEVDdkQ1RVJUV3RCUVZFbGNDUDNmTzJtMno1aFFCYVh5SVBKZ3VUVmJFQnFxNEx2dUlhS2FGV0RUbHk2UVh1ZTgzZGlUV0hjNHd2RnZxSjh1cE5UZGFlZFkwTEd3Qm1ObEFTNkpFTXpRYXpRcDc3aUxJNDFncUZwOVo2eVVabU5EY0VlRTJOc3JjVWNScUtvbjFBQkkzVnllUjk1dzd2aWE4a3dMdXFCMXhtRyszeDFzcWpBV0VTcWVNcDRwVGxvRThidkNmMStaem1tTFVxazd4K0ladzdkd21wZHdhN0xuRGtCcDZ0T1lkZStZQlc2ZjVDR010Y2h6bTU5Q2MzeHJYOE9MejNlU0o1Mm8rTFIza0JcL1RmWDJwQlRMdzVBOVM4TWpKWHV0SGhhREZyWVdUNXNtcUE4TGtFNkVvRFd0cFlHYVlZQlQ0TzM2b1dHTmZDaUJjd3JSRlJEMGJcL25Ob2F6TnZGRlpVZGJxdjh2a3A4dTdVY2VcL2tvZzdzem1KTjRVUzRVbzhhbUV3T2llV3N4dG1QY0ZlS1B4VDV6NjhRSmRcL0tZNktmNTVCMWxNbUw5bk9CWGJjZjZyQU85b2ZSK0hTNitIcnpJZ01rcWorc0xmTVRVb1NneUgyTnZ6QzZtbE1qQnBreGw5UmVOZlJGeitLY3hySllDZmxtKzZCNnZuWlhLbmlTS2FPeDVUOWl6OEF1RHc5cmtxeldsZVgyMXBZMU9DdVdCM3RGWTNOXC9FWHExb2hVK2t2TUtOWHpHdklYNHFPbGg1S0UzNDc5dGhqRDg1ZWl0bjJEajFhNDV3NVwvSHI1bzFNdTl1NmI4cWJmVFBkWlZaUEg4Y2Jocjdpb3lOWUNDaG5aR1VNV1lNMTRiS1wvd0x3NFBQejNQMzJ2aXp0TUVBQUEiLCJzY29wZXMiOlsiaW52b2ljZSIsImN1c3RvbWVyIl0sImF1dGhzb3VyY2UiOiJPQVVUSDIiLCJpZCI6ImFmM2FlZTNhZTJmNGNlMzVkOTkwODVmZjhhZjYxNzA5YTY1YzAxOTAiLCJqdGkiOiJhZjNhZWUzYWUyZjRjZTM1ZDk5MDg1ZmY4YWY2MTcwOWE2NWMwMTkwIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS5mb3J0bm94LnNlXC9vYXV0aDIiLCJhdWQiOiJUN3g4c0N6eVAxbkMiLCJzdWIiOiIxQDEyOTQ0MDUiLCJleHAiOjE2NTgwMzg5MTAsImlhdCI6MTY1ODAzNTMxMCwidG9rZW5fdHlwZSI6ImJlYXJlciIsInNjb3BlIjoiaW52b2ljZSBjdXN0b21lciJ9.Y4MtX4-Z7X8eEeewi_X9aWG1xEAkaWZDt5zuCQT4zWU',
                    expires_in: 3600,
                    token_type: 'bearer',
                    scope: 'invoice customer',
                    refresh_token: 'dd50bcfa7f8577f7a228cbe5efce3d0400900ac4'
                }
            }

            axios.post.mockResolvedValueOnce(mockResult)
            const result = await fortnox.refreshToken('mock')

            expect(result).toEqual(mockResult.data)
        })
    })
})

/** Will test dispatch and pagination */
describe("getCustomerNumber", () => {
    describe("when API call is successful", () => {
        it("should return customer id", async () => {

            const mockResult1 = {
                status: 200,
                data: {
                    MetaInformation: { '@TotalResources': 5, '@TotalPages': 2, '@CurrentPage': 1 },
                    Customers: [
                        {
                            '@url': 'https://api.fortnox.se/3/customers/1',
                            CustomerNumber: '1',
                            Email: 'email1@server.com',
                        },
                        {
                            '@url': 'https://api.fortnox.se/3/customers/2',
                            CustomerNumber: '2',
                            Email: 'email2@server.com',
                        },
                        {
                            '@url': 'https://api.fortnox.se/3/customers/3',
                            CustomerNumber: '3',
                            Email: 'email3@server.com',
                        }]
                }
            }

            const mockResult2 = {
                status: 200,
                data: {
                    MetaInformation: { '@TotalResources': 5, '@TotalPages': 2, '@CurrentPage': 2 },
                    Customers: [
                        {
                            '@url': 'https://api.fortnox.se/3/customers/4',
                            CustomerNumber: '4',
                            Email: 'email4@server.com',
                        },
                        {
                            '@url': 'https://api.fortnox.se/3/customers/5',
                            CustomerNumber: '5',
                            Email: 'email5@server.com',
                        },
                    ]
                }
            }

            axios.mockResolvedValueOnce(mockResult1).mockResolvedValueOnce(mockResult2)
            
            const result = await fortnox.getCustomerNumber('access-token', 'email4@server.com')

            expect(result).toEqual(4)
        })
    })
})