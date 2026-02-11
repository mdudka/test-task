import { PageHolder } from './abstractPage';
import { HomePage } from './pages/home.page';
import { LandingPage } from './pages/landing.page';
import { ProjectsPage } from './pages/projects/projects.page';
import { CreateProjectPage } from './pages/projects/create-project.page';
import { ProjectDetailsPage } from './pages/projects/project-details.page';
import { Navigation } from './components/navigation.component';

export class Application extends PageHolder {
    public landing = new LandingPage(this.page);
    public home = new HomePage(this.page);
    public projects = new ProjectsPage(this.page);
    public createProject = new CreateProjectPage(this.page);
    public projectDetails = new ProjectDetailsPage(this.page);
    public navigation = new Navigation(this.page);
}
