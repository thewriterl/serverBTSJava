package films.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Posts.
 */
@Entity
@Table(name = "posts")
public class Posts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Column(name = "post_content")
    private String postContent;

    @Column(name = "video_url")
    private String videoURL;

    @Column(name = "image_url")
    private String imageURL;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public Posts postTitle(String postTitle) {
        this.postTitle = postTitle;
        return this;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostContent() {
        return postContent;
    }

    public Posts postContent(String postContent) {
        this.postContent = postContent;
        return this;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getVideoURL() {
        return videoURL;
    }

    public Posts videoURL(String videoURL) {
        this.videoURL = videoURL;
        return this;
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }

    public String getImageURL() {
        return imageURL;
    }

    public Posts imageURL(String imageURL) {
        this.imageURL = imageURL;
        return this;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Posts posts = (Posts) o;
        if (posts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), posts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Posts{" +
            "id=" + getId() +
            ", postTitle='" + getPostTitle() + "'" +
            ", postContent='" + getPostContent() + "'" +
            ", videoURL='" + getVideoURL() + "'" +
            ", imageURL='" + getImageURL() + "'" +
            "}";
    }
}
