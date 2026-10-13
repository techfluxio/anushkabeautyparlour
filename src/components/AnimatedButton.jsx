import {Link} from 'react-router-dom';
export default function AnimatedButton({variant='primary',to,href,onClick,iconLeft,iconRight,loading=false,disabled=false,children,className='',type='button',...rest}){
 const cls=`btn btn-${variant} ${disabled?'is-disabled':''} ${loading?'is-loading':''} ${className}`;
 const body=<>{loading?<span className="spin" aria-hidden="true"/>:iconLeft}<span>{children}</span>{!loading&&iconRight}</>;
 if(disabled&&(to||href))return <span role="link" aria-disabled="true" className={cls} {...rest}>{body}</span>;
 if(to)return <Link to={to} className={cls} {...rest}>{body}</Link>;
 if(href)return <a href={href} className={cls} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noopener noreferrer':undefined} {...rest}>{body}</a>;
 return <button type={type} onClick={onClick} disabled={disabled||loading} aria-busy={loading||undefined} className={cls} {...rest}>{body}</button>}
