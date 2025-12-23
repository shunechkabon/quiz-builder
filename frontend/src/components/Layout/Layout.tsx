import { NavLink, Outlet } from 'react-router-dom';
import s from './Layout.module.css';

const Layout = () => {
    return (
        <div className={s.page}>
            <header className={s.header}>
                <h1 className={s.title}>Quiz Builder</h1>

                <nav className={s.nav}>
                    <NavLink to="/quizzes" className={s.link}>Quizzes</NavLink>
                    <NavLink to="/create" className={s.link}>Create</NavLink>
                </nav>
            </header>

            <main className={s.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
