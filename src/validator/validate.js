export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );

export const validPhoneNumber = new RegExp(
    '([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})'
)

export const validPassword = new RegExp(
    '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.,/;#?!@$%^&*-]).{8,}$'
)