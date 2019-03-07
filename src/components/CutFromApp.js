{
  /* <Route
              exact
              path="/topstories"
              render={props => (
                <SectionSearch {...props} fetchArticles={this.fetchArticles} />
              )}
            /> */
}
{
  /* <Route
              exact
              path={`/topstories/${this.state.section}`}
              render={props =>
                this.state.isLoading ? (
                  <Spinner text="Loading articles" />
                ) : (
                  <SectionStories
                    {...props}
                    section={this.state.section}
                    label={this.state.label}
                    stories={this.state.stories}
                    showMore={this.state.showMore}
                    showNextSection={this.showNextSection}
                    showMoreStories={this.showMoreStories}
                  />
                )
              }
            /> */
}
{
  /* <Route
              exact
              path="/movies/criticspicks"
              render={props => (
                <MoviesCriticsPicks
                  {...props}
                  isLoading={this.state.isLoading}
                  movies={this.state.criticsPicksMovies}
                />
              )}
            />
            <Route
              exact
              path="/movies/search/"
              render={props => (
                <MoviesUserSearch
                  {...props}
                  isLoading={this.state.isLoading}
                  fetchUserSearchMovies={this.fetchUserSearchMovies}
                  movies={this.state.userSearchMovies}
                />
              )}
            /> */
}
{
  /* <Route
              exact
              path={`/movies/search/${formatTitle(this.state.movieTitle)}`}
              render={props => (
                <MoviesUserSearch
                  {...props}
                  isLoading={this.state.isLoading}
                  fetchUserSearchMovies={this.fetchUserSearchMovies}
                  movies={this.state.userSearchMovies}
                />
              )}
            />
            <Route component={NotFound} /> */
}
