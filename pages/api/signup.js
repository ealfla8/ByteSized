// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log(req.body);
    const bodyData = JSON.parse(req.body);
    const {data, error} = await supabase.auth.signUp({
        email: bodyData.email,
        password: bodyData.password,
        options: {
            data: {
                account_type: "user",
            },
        },
    });

    console.log(data);

    if (error) {
        res.status(403).json({ error });
    } else {
        const {error: supabaseError} = await supabase.from('users').insert({id: data.user.id, email: bodyData.email});
        res.status(200).end();
    }
}
